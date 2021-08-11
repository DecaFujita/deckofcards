import React from 'react';
import './deckofcards.styles.css';

class DeckOfCards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            cards: [
            ]
        }
    }
    async componentDidUpdate() {
        console.log('DID UPDADE!')
    }

    async componentDidMount() {
        let deck_response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle');
        let deck = await deck_response.json();
        let deck_id = deck.deck_id
        this.setState({id: deck_id})
    }



    render() {
        return (
            <div className='deckofcards'>
                <button>Give me a card!</button>
            </div>
        )
    }
}

export default DeckOfCards;