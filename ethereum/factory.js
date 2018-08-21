import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const address = '0x35392fca0EbC80C75AE28a6bB74Bd1AF4d9eA986';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    address
);

export default instance;