// js/supabase-config.js
// Initialize Supabase client
const SUPABASE_URL = 'https://ocogiccvensfiqyzwfom.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D5mMwpzQEyXXvvgfJzP0tw_CWWeGgOE';

// Create Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession();
    updateNavigation(session);
});

// Update navigation based on auth status
function updateNavigation(session) {
    const navButtons = document.querySelector('.nav-buttons');
    if (!navButtons) return;

    if (session) {
        // User is logged in
        navButtons.innerHTML = `
            <a href="/dashboard/" class="btn-nav btn-profile">
                <i class="fas fa-user"></i> Profile
            </a>
            <a href="#" class="btn-nav btn-logout" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        `;
    } else {
        // User is logged out
        navButtons.innerHTML = `
            <a href="/login/" class="btn-nav btn-login">Login</a>
            <a href="/signup/" class="btn-nav btn-signup">Sign Up</a>
        `;
    }
}

// Logout function
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = '/home/';
    }
}

// Show error message
function showError(message, elementId = 'errorMessage') {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.style.display = 'flex';
        errorEl.querySelector('span').textContent = message;
        setTimeout(() => {
            errorEl.style.display = 'none';
        }, 5000);
    }
}

// Show success message
function showSuccess(message, elementId = 'successMessage') {
    const successEl = document.getElementById(elementId);
    if (successEl) {
        successEl.style.display = 'flex';
        successEl.querySelector('span').textContent = message;
        setTimeout(() => {
            successEl.style.display = 'none';
        }, 5000);
    }
}
