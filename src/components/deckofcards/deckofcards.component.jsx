import React from 'react';
import Card from '../card/card.component';
import './deckofcards.styles.css';

const API_BASE = 'https://deckofcardsapi.com/api/deck/';

class DeckOfCards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            cards: []
        }
    }

    componentDidUpdate() {
        console.log(this.state.cards.length)
    }

    async componentDidMount() {
        let deck_response = await fetch(`${API_BASE}new/shuffle/`);
        let deck = await deck_response.json();
        let deck_id = deck.deck_id
        this.setState({id: deck_id})
    }

    giveACard = async() => {
        let id = this.state.id;
        try {
            let card_response = await fetch(`${API_BASE}${id}/draw/`);
            let card_result = await card_response.json();
            let card = await card_result.cards[0];
            this.setState(st => ({
                cards: [...st.cards,
                {
                    id: card.code,
                    image: card.image,
                    name: `${card.value} of ${card.suit}`
                }
                ]}));
        } catch(err) {
            console.log('error!', err)
        }
    }

    render() {
        return (
            <div className='table'>
                 {this.state.cards.length === 52 ?
                    <button disabled> No more cards</button>
                :   
                    <button onClick={this.giveACard}> New card!</button>
                }
                <div className='deckofcards'>
                    {this.state.cards.map(({id, ...otherCardProps}) => 
                        <Card key={id} id={id} {...otherCardProps} />
                    )}
                </div>
            </div>
        )
    }
}

export default DeckOfCards;