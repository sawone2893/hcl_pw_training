export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput=page.getPlaceholder("Username");
    this.passwordInput=page.getPlaceholder("Password");
    this.loginBtn=page.locator("//input[@name='login-button']");
  }

  async navigateToLogin(){
    await this.page.goto("/");
  }

  async appLogin(username,password){
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
