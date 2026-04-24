/**
 * Smart navigation for CTA buttons
 * Checks auth status and navigates appropriately
 * - If already logged in: go to /chat
 * - If not logged in: go to /login
 */
export const handleCTAClick = (navigate, isAuthenticated) => {
  if (isAuthenticated) {
    // User is already logged in, take them directly to chat
    navigate("/chat");
  } else {
    // User needs to login first
    navigate("/login", {
      state: { from: "/chat" },
    });
  }
};
