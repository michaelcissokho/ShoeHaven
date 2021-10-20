import { render, screen } from '@testing-library/react';
import Cart from './Cart'

let items
beforeEach(function(){
    items = [  {
        "id": 6,
        "username": "michael",
        "title": "Item 2",
        "picture": "data:image/jpeg;base64,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",
        "price": 1000,
        "details": "This is the second listing on this website",
        "sold": false
      },
      {
        "id": 7,
        "username": "michael",
        "title": "Item 3",
        "picture": "data:image/jpeg;base64,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",
        "price": 200,
        "details": "Item 3 to test out the grid",
        "sold": false
      }]
})

it('renders cart without error', function(){
    render(<Cart items={items}/>)
})

it('should match snapshot', function(){
    const {asFragment} = render(<Cart items={items}/>)
    expect(asFragment()).toMatchSnapshot()
})
