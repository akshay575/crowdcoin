import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const address = '0x1bd03266947b877bf650201BeC1e62D8cC58f93E';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    address
);

export default instance;