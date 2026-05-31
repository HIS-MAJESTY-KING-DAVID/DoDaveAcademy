// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, style: _style, ...rest } = props;
    return <img src={src as string} alt={alt as string} {...rest} />;
  },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  global.fetch = vi.fn();
});

describe('Header (Tailwind)', () => {
  it('renders logo and brand name', async () => {
    const Header = (await import('@/components/layout/Header')).default;
    render(<Header />);
    expect(screen.getByText('DoDave Academy')).toBeInTheDocument();
    expect(screen.getByAltText('DoDave Academy')).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    const Header = (await import('@/components/layout/Header')).default;
    render(<Header />);
    expect(screen.getByText('CATEGORIES_KEY')).toBeInTheDocument();
    expect(screen.getByText('HOME_KEY')).toBeInTheDocument();
    expect(screen.getByText('COURSES_KEY')).toBeInTheDocument();
    expect(screen.getByText('EXAMS_KEY')).toBeInTheDocument();
    expect(screen.getByText('FORUM_KEY')).toBeInTheDocument();
    expect(screen.getByText('SUBSCRIBE_KEY')).toBeInTheDocument();
  });

  it('renders sign in and enroll buttons', async () => {
    const Header = (await import('@/components/layout/Header')).default;
    render(<Header />);
    const signIn = screen.getByText('SIGN_IN_KEY');
    const enroll = screen.getByText('ENROLL_NOW_KEY');
    expect(signIn.closest('a')).toHaveAttribute('href', '/login');
    expect(enroll.closest('a')).toHaveAttribute('href', '/register');
  });

  it('renders search input', async () => {
    const Header = (await import('@/components/layout/Header')).default;
    render(<Header />);
    expect(screen.getByPlaceholderText('SEARCH_KEY')).toBeInTheDocument();
  });

  it('toggles mobile menu on hamburger click', async () => {
    const Header = (await import('@/components/layout/Header')).default;
    render(<Header />);
    const hamburger = screen.getByLabelText('Toggle navigation');
    const menu = document.getElementById('navbarCollapse')!;

    expect(menu.className).toContain('hidden');
    fireEvent.click(hamburger);
    expect(menu.className).toContain('block');
    fireEvent.click(hamburger);
    expect(menu.className).toContain('hidden');
  });
});

describe('PaymentCheckout', () => {
  it('renders amount and item label', async () => {
    const PaymentCheckout = (await import('@/components/payment/PaymentCheckout')).default;
    render(
      <PaymentCheckout
        amount={5000}
        itemLabel="React Course"
        type="course"
        customerEmail="test@test.com"
        customerName="Test User"
      />
    );
    expect(screen.getByText(/React Course/)).toBeInTheDocument();
    expect(screen.getAllByText(/5,000 FCFA/).length).toBeGreaterThan(0);
  });

  it('renders phone input and pay button', async () => {
    const PaymentCheckout = (await import('@/components/payment/PaymentCheckout')).default;
    render(
      <PaymentCheckout
        amount={5000}
        itemLabel="Course"
        type="course"
        customerEmail="test@test.com"
        customerName="Test"
      />
    );
    expect(screen.getByPlaceholderText('6XXXXXXXX')).toBeInTheDocument();
    expect(screen.getByText(/Pay 5,000 FCFA/)).toBeInTheDocument();
  });

  it('shows success message on successful payment initiation', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reference: 'PAY-ABC', transactionId: 'txn_1' }),
    });
    const PaymentCheckout = (await import('@/components/payment/PaymentCheckout')).default;
    render(
      <PaymentCheckout
        amount={3000}
        itemLabel="Basic Plan"
        type="subscription"
        customerEmail="a@b.com"
        customerName="Alice"
      />
    );
    fireEvent.change(screen.getByPlaceholderText('6XXXXXXXX'), { target: { value: '671234567' } });
    fireEvent.click(screen.getByText(/Pay 3,000 FCFA/));

    const msg = await screen.findByText(/Payment initiated/);
    expect(msg).toBeInTheDocument();
    expect(msg).toHaveTextContent('PAY-ABC');
  });

  it('shows error message on failed payment', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Insufficient balance' }),
    });
    const PaymentCheckout = (await import('@/components/payment/PaymentCheckout')).default;
    render(
      <PaymentCheckout
        amount={3000}
        itemLabel="Plan"
        type="subscription"
        customerEmail="a@b.com"
        customerName="Bob"
      />
    );
    fireEvent.change(screen.getByPlaceholderText('6XXXXXXXX'), { target: { value: '691234567' } });
    fireEvent.click(screen.getByText(/Pay 3,000 FCFA/));

    const msg = await screen.findByText('Insufficient balance');
    expect(msg).toBeInTheDocument();
  });

  it('disables button while loading', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(() => new Promise(() => {}));
    const PaymentCheckout = (await import('@/components/payment/PaymentCheckout')).default;
    render(
      <PaymentCheckout
        amount={3000}
        itemLabel="Plan"
        type="course"
        customerEmail="a@b.com"
        customerName="Carol"
      />
    );
    fireEvent.change(screen.getByPlaceholderText('6XXXXXXXX'), { target: { value: '671234567' } });
    fireEvent.click(screen.getByText(/Pay 3,000 FCFA/));

    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(screen.getByText('Processing...').closest('button')).toBeDisabled();
  });

  it('calls onSuccess callback with reference', async () => {
    const onSuccess = vi.fn();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reference: 'PAY-REF-1' }),
    });
    const PaymentCheckout = (await import('@/components/payment/PaymentCheckout')).default;
    render(
      <PaymentCheckout
        amount={5000}
        itemLabel="Test"
        type="course"
        customerEmail="a@b.com"
        customerName="Dave"
        onSuccess={onSuccess}
      />
    );
    fireEvent.change(screen.getByPlaceholderText('6XXXXXXXX'), { target: { value: '671234567' } });
    fireEvent.click(screen.getByText(/Pay 5,000 FCFA/));
    await screen.findByText(/Payment initiated/);
    expect(onSuccess).toHaveBeenCalledWith('PAY-REF-1');
  });
});
