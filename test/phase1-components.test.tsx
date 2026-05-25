// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams('sort=newest'),
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, style: _style, ...rest } = props;
    return <img src={src as string} alt={alt as string} {...rest} />;
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  global.fetch = vi.fn();
});

function mockFetch(ok: boolean, data: Record<string, unknown>) {
  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
    ok,
    json: () => Promise.resolve(data),
  });
}

describe('BecomeTeacherForm', () => {
  it('renders all form fields and submit button', async () => {
    const BecomeTeacherForm = (await import('@/components/auth/BecomeTeacherForm')).default;
    render(<BecomeTeacherForm />);

    expect(screen.getByPlaceholderText('Your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+237 XXX XXX XXX')).toBeInTheDocument();
    expect(screen.getByText('Submit Application')).toBeInTheDocument();
  });

  it('shows success message on successful submission', async () => {
    mockFetch(true, { message: 'Application submitted successfully' });
    const BecomeTeacherForm = (await import('@/components/auth/BecomeTeacherForm')).default;
    render(<BecomeTeacherForm />);

    fireEvent.change(screen.getByPlaceholderText('Your full name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'jane@test.com' } });
    fireEvent.change(screen.getByDisplayValue('Select your expertise'), { target: { value: 'web-development' } });
    fireEvent.change(screen.getByPlaceholderText('Tell us about your teaching experience and qualifications...'), { target: { value: 'Experienced teacher' } });
    fireEvent.click(screen.getByText('Submit Application'));

    await waitFor(() => {
      expect(screen.getByText(/submitted successfully/)).toBeInTheDocument();
    });
  });

  it('shows error message on failed submission', async () => {
    mockFetch(false, { message: 'Server error' });
    const BecomeTeacherForm = (await import('@/components/auth/BecomeTeacherForm')).default;
    render(<BecomeTeacherForm />);

    fireEvent.change(screen.getByPlaceholderText('Your full name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'jane@test.com' } });
    fireEvent.change(screen.getByDisplayValue('Select your expertise'), { target: { value: 'web-development' } });
    fireEvent.change(screen.getByPlaceholderText('Tell us about your teaching experience and qualifications...'), { target: { value: 'Experienced teacher' } });
    fireEvent.click(screen.getByText('Submit Application'));

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('disables submit button while loading', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(() => new Promise(() => {}));
    const BecomeTeacherForm = (await import('@/components/auth/BecomeTeacherForm')).default;
    render(<BecomeTeacherForm />);

    fireEvent.change(screen.getByPlaceholderText('Your full name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'jane@test.com' } });
    fireEvent.change(screen.getByDisplayValue('Select your expertise'), { target: { value: 'web-development' } });
    fireEvent.change(screen.getByPlaceholderText('Tell us about your teaching experience and qualifications...'), { target: { value: 'Experienced teacher' } });
    fireEvent.click(screen.getByText('Submit Application'));

    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByText('Submitting...').closest('button')).toBeDisabled();
  });
});

describe('ContactClient', () => {
  it('renders contact info and form', async () => {
    const ContactClient = (await import('@/app/contact/ContactClient')).default;
    render(<ContactClient />);

    expect(screen.getByText(/We're here to help/)).toBeInTheDocument();
    expect(screen.getByLabelText('Your name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address *')).toBeInTheDocument();
    expect(screen.getByLabelText('Message *')).toBeInTheDocument();
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('shows success alert on successful submission', async () => {
    mockFetch(true, {});
    const ContactClient = (await import('@/app/contact/ContactClient')).default;
    render(<ContactClient />);

    fireEvent.change(screen.getByLabelText('Your name *'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Email address *'), { target: { value: 'alice@test.com' } });
    fireEvent.change(screen.getByLabelText('Message *'), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
    });
  });

  it('shows error alert on failed submission', async () => {
    mockFetch(false, {});
    const ContactClient = (await import('@/app/contact/ContactClient')).default;
    render(<ContactClient />);

    fireEvent.change(screen.getByLabelText('Your name *'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Email address *'), { target: { value: 'alice@test.com' } });
    fireEvent.change(screen.getByLabelText('Message *'), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText('Failed to send message. Please try again.')).toBeInTheDocument();
    });
  });

  it('disables submit button while loading', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(() => new Promise(() => {}));
    const ContactClient = (await import('@/app/contact/ContactClient')).default;
    render(<ContactClient />);

    fireEvent.change(screen.getByLabelText('Your name *'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Email address *'), { target: { value: 'alice@test.com' } });
    fireEvent.change(screen.getByLabelText('Message *'), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByText('Send Message'));

    expect(screen.getByText('Sending...')).toBeInTheDocument();
    expect(screen.getByText('Sending...').closest('button')).toBeDisabled();
  });
});

describe('SortSelect', () => {
  it('renders with current sort value selected', async () => {
    const SortSelect = (await import('@/components/courses/SortSelect')).default;
    render(<SortSelect current="newest" />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('newest');
  });

  it('calls router.push with sort param on change', async () => {
    const SortSelect = (await import('@/components/courses/SortSelect')).default;
    render(<SortSelect current="newest" />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'rating' } });

    expect(mockPush).toHaveBeenCalledWith('/courses?sort=rating&page=1');
  });
});
