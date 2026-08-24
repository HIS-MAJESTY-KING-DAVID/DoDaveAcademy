# Live Browser Audit Notes

Date: 2026-08-24

The production homepage at `https://academy.dodave.tech/` rendered successfully with real course data, shared navigation, search input, language switcher, and footer links. The live site’s language menu opened and switching from English to French changed the header, hero copy, CTA labels, and footer copy without a visible layout failure.

The production deployment currently predates the uncommitted audit fixes: the live footer still showed the old `/become-teacher#contactTitle` fragment and `/terms` privacy target, while the working tree now removes the invalid fragment and points privacy to `/privacy`. These live differences should be rechecked after deployment.

The French runtime layer translated shared/static copy, but database-backed course names and category labels remained in their stored source language, which is expected. The live menu still displayed some legacy English labels such as “All”, “Online Courses”, and “Instructor”; these are content or unmapped legacy literals to review if complete French coverage is required.
