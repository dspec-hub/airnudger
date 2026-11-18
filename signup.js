(() => {
  const form = document.getElementById('beta-signup');
  const status = document.getElementById('signup-status');
  const submit = form.querySelector('button');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const token = form.querySelector('[name="cf-turnstile-response"]')?.value;
    if (!token) { status.textContent = 'Please complete the security check and try again.'; return; }
    submit.disabled = true;
    status.textContent = 'Adding you to the list…';
    try {
      const response = await fetch('/api/signup', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email:form.elements.email.value.trim(),token})});
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error('Signup failed');
      form.reset();
      status.textContent = 'You’re on the list! We’ll email you about Beta access and updates.';
    } catch (_) {
      status.textContent = 'We couldn’t save your email. Please try again or use the Google Forms link below.';
    } finally { submit.disabled = false; if (window.turnstile) window.turnstile.reset(); }
  });
})();
