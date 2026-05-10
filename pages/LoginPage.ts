import type { Page, Locator } from "@playwright/test";
export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginBtn: Locator;
  private errorMessage: Locator;
  private rememberMeCheckbox: Locator;
  private forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginBtn = page.locator("//input[@name='login-button']");
    this.errorMessage = page.locator("[role='alert']");
    this.rememberMeCheckbox = page.locator("input[type='checkbox']");
    this.forgotPasswordLink = page.locator("a:has-text('Forgot Password')");
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.page.goto("/");
  }

  /**
   * Fill username field
   */
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password field
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    await this.loginBtn.click();
  }

  /**
   * Complete login with credentials
   */
  async appLogin(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  /**
   * Get error message text
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  /**
   * Click Remember Me checkbox
   */
  async clickRememberMe() {
    await this.rememberMeCheckbox.click();
  }

  /**
   * Click Forgot Password link
   */
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  /**
   * Check if login button is enabled
   */
  async isLoginButtonEnabled() {
    return await this.loginBtn.isEnabled();
  }

  /**
   * Wait for login page to load
   */
  async waitForLoginPageLoad() {
    await this.page.waitForLoadState("networkidle");
    await this.usernameInput.waitFor({ state: "visible" });
  }
}
