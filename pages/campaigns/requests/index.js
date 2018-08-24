import react, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;

        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.getRequestsCount().call();

        const requests = await Promise.all(
            Array(requestsCount)
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        return { address, requests, requestsCount };
    }

    renderRows() {
        this.state.requests.map((request, index) => {
            return 
                <RequestRow 
                    key={index}
                    request={request}
                    address={this.props.address}
                />
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Table>
            </Layout>
            
        );
    }
}

export default RequestIndex;