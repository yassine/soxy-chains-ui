import * as React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';
import { configure, mount } from 'enzyme';
import Application from './Application';
import { expect } from 'chai';
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

describe('Test', function () {
  beforeEach(() => {
    jasmineEnzyme();
  });
  it('should work', function () {
    const wrapper = mount(<Application/>);
    expect(true).to.be.eq(true);
  });
});
