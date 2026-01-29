import { BasePage } from "../pages/BasePage";
export class BrokenLinkPage extends BasePage{
  constructor(page){
    super(page)
  }
  pageLocator={
    brokenLink:"//div[@id='broken-links']/a",
  }
async navigateToBrokenLinkPage() {
    await this.actions.navigateTo("/");
  }
  async validateBrokenLinks(){
    const links=this.actions.getLocator("xpath",this.pageLocator.brokenLink);
    const linksCount=await this.actions.getLocatorCount(links);
    console.log(`LinksCount:${linksCount}`)
    for( let i=0;i<linksCount;i++){
      const linkHref=await this.actions.getElementAttribute(this.actions.getNthLocator(links,i),"href");
      console.log(`Links href: ${linkHref}`);
    }
  }
}