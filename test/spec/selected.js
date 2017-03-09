import React from 'react'
import Selected from '../../src/component/selected/selected.jsx'
import { shallow } from 'enzyme'

const options = [{
    text: 'foo',
    value: 1
}, {
    text: 'bar',
    value: 2
}]

let wrapper

beforeEach(()=>{
    wrapper = shallow(<Selected options={options}/>)
})

describe('selected',()=>{
    test('expect selected component rendered correct', () => {
        console.log()
        expect(wrapper.find('.selected').length).toEqual(1)
    })
})
