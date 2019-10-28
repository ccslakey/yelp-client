import React from 'react';

export default class Home extends React.Component {
    state = {
        address: ''
    }

    setAddress = (e) => this.setState({address: e.target.value})

    render = () => {
        return (
            <div id='home-page' className='page'>
                
                <div >
                    <div className='pop-up-fast closed'>You're a busy person, and you're not picky.</div>
                    
                    <div className='pop-up-slow closed'>
                        I'll help you order a wonderful meal to be delivered to your door.
                    </div>
                </div>
    
    
    
                <div className=''>
                    <h2>First, I need to know where you are.</h2>
    
    
                    <form >
                        <input className='brdr-radius text-input' placeholder='123 Hungry Lane CA, USA 95758' onChange={this.setAddress} />
                    </form>
                </div>
            </div>
        );
    }
}