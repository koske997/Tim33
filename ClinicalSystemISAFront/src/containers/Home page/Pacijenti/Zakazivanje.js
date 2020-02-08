import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';


class Zakazivanje extends React.Component {


    render(){
        return (
            <Modal open={this.props.openModal} onClose={e => this.props.closeModall()}>
                <Header icon='archive' content='Archive Old Messages' />
                <Modal.Content>
                <p>
                    Dali ste sigurni da zelite da zakazete ovaj pregled?
                </p>
                </Modal.Content>
                <Button basic color='red'  onClick={e => {this.props.closeModall();}}  >
                    <Icon name='remove' /> Ne
                </Button>
                <Button color='green' inverted onClick={e => {this.props.hoce();}}>
                    <Icon name='checkmark' /> Da
                </Button>
            </Modal>);
    }


}

export default Zakazivanje;