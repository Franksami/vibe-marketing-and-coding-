# Vibe Academy - Manual Test Checklist

## Quick Test URLs
- **Production Site**: https://vibe-marketing-and-coding.vercel.app
- **ConvertKit Dashboard**: https://app.convertkit.com
- **Stripe Dashboard**: https://dashboard.stripe.com/test
- **Google Analytics**: https://analytics.google.com

## 1. Email Capture Tests

### Hero Section Form
- [ ] Visit homepage
- [ ] Enter email: `test-hero@example.com`
- [ ] Click "Get Free Starter Kit"
- [ ] ✓ Success message appears
- [ ] ✓ Check ConvertKit for new subscriber

### CTA Section Form
- [ ] Scroll to bottom CTA section
- [ ] Enter email: `test-cta@example.com`
- [ ] Click "Get Instant Access"
- [ ] ✓ Success message appears
- [ ] ✓ Check ConvertKit for new subscriber

### Exit Intent Popup
- [ ] Stay on page for 10 seconds
- [ ] Move mouse to leave page (towards browser tabs)
- [ ] ✓ Popup appears
- [ ] Enter email: `test-popup@example.com`
- [ ] ✓ Check ConvertKit for new subscriber

## 2. Stripe Payment Test

### Checkout Flow
- [ ] Click "Become Founding Member" button
- [ ] ✓ Redirects to Stripe checkout
- [ ] ✓ Shows $499.00 price
- [ ] ✓ Shows "Vibe Academy Founding Member"

### Test Payment
- [ ] Email: `stripe-test@example.com`
- [ ] Card: `4242 4242 4242 4242`
- [ ] Expiry: `12/34`
- [ ] CVC: `123`
- [ ] Name: `Test User`
- [ ] ✓ Payment processes successfully
- [ ] ✓ Redirects to `/purchase-success`
- [ ] ✓ Success page shows confirmation

### Stripe Dashboard
- [ ] Check Stripe dashboard for test payment
- [ ] ✓ Payment shows as succeeded
- [ ] ✓ Customer created with email

## 3. Authentication Tests

### Sign Up
- [ ] Click "Sign In" → "Sign Up"
- [ ] Email: `auth-test@example.com`
- [ ] Password: `testpassword123`
- [ ] ✓ Account created
- [ ] ✓ Automatically logged in

### Sign In
- [ ] Sign out
- [ ] Click "Sign In"
- [ ] Use same credentials
- [ ] ✓ Successfully logged in
- [ ] ✓ User menu appears

### Magic Link
- [ ] Click "Sign in with magic link"
- [ ] Enter email
- [ ] ✓ Email sent message appears
- [ ] Check email for magic link

### Protected Routes
- [ ] While logged out, visit `/library`
- [ ] ✓ Redirects to home or shows auth prompt
- [ ] Log in
- [ ] Visit `/library` again
- [ ] ✓ Page loads successfully

## 4. Google Analytics Tests

### Real-time Tracking
- [ ] Open GA4 Real-time report
- [ ] Navigate between pages
- [ ] ✓ Page views appear in real-time
- [ ] ✓ User count shows your visit

### Event Tracking
- [ ] Submit email form
- [ ] ✓ `email_capture` event appears
- [ ] Click checkout
- [ ] ✓ `begin_checkout` event appears

## 5. Responsive Design

### Mobile View
- [ ] Open Chrome DevTools (F12)
- [ ] Toggle device toolbar
- [ ] Select iPhone 12 Pro
- [ ] ✓ Navigation menu collapses
- [ ] ✓ All sections readable
- [ ] ✓ Forms work correctly
- [ ] ✓ Buttons are tappable

### Tablet View
- [ ] Select iPad Air
- [ ] ✓ Layout adjusts properly
- [ ] ✓ No horizontal scroll
- [ ] ✓ All features accessible

## Test Results Summary

- **Email Capture**: ⬜ Working / ⬜ Issues
- **Stripe Checkout**: ⬜ Working / ⬜ Issues
- **Authentication**: ⬜ Working / ⬜ Issues
- **Analytics**: ⬜ Working / ⬜ Issues
- **Responsive**: ⬜ Working / ⬜ Issues

## Notes
_Add any issues or observations here:_