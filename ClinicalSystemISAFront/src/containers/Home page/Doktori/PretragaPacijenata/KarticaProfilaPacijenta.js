import React from 'react';


class KarticaProfilaPacijenta extends React.Component {

    constructor(props){
        super(props);
    }
    
    render(){
            return (
                <div className="ui link cards">
                    <div className="card">
                        <div className="image">
                            <img alt="da" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
                        </div>
                    <div className="content">
                        <div className="header">{this.props.pacijent.firstName} {this.props.pacijent.lastName}</div>
                        <div className="meta">
                            <a>{this.props.pacijent.role}</a>
                        </div>
                        <div className="description">
                            {this.props.pacijent.address}, {this.props.pacijent.city}, {this.props.pacijent.country} 
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                        {this.props.pacijent.phoneNumber}
                        </span>
                        <span>
                            <i className="user icon"></i>
                            {this.props.pacijent.username}
                        </span>
                    </div>
                    </div>
                </div>
            );
    }
}

export default KarticaProfilaPacijenta;