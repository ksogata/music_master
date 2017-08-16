import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: [],
        };
    }
    
    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        const accessToken = 'BQA_Ups4z3oDRjQ9oMVE3GJeRo9wYAZc45aY_k47nwoHtc2ukDgJvdT3si3SdfUKvdobHGI-ANzjaLnSLREIHMiBms1UNgG7G_UUOzhxT0D6dOvLvYXdqSQzwMIvC1_l4-SkP9cV9VtWUl3dN60JXW0Lpo8AvScIyNTIBw';

        console.log(FETCH_URL);
        
        var myOptions = {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };
        
        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({artist});
                
                FETCH_URL= `${ALBUM_URL}${artist.id}/top-tracks?country=US`;
                fetch(FETCH_URL, myOptions)
                    .then(response => response.json())
                    .then(json => {
                        console.log('artist\'s top tracks: ', json);
                        const { tracks } = json;
                        this.setState({tracks});
                    })
            });
    }
    
    render() {
        return (
            <div className="App">
                <div className="App-title">
                    Music Master
                </div>
                
                <FormGroup>
                    <InputGroup>
                    <FormControl 
                        type="text"
                        placeholder="search an artist..."
                        value={this.state.query}
                        onChange={event => {this.setState({query: event.target.value})}}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.search();
                            }
                        }}
                        />
                    <InputGroup.Addon onClick={() => this.search()}>
                        <Glyphicon glyph="search" />
                    </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ? <div>
                        <Profile
                            artist={this.state.artist}
                        />
                            
                        <Gallery
                            tracks={this.state.tracks}
                        />
                    </div>
                    : <div></div>
                }
            </div>
        );
    }
}

export default App;