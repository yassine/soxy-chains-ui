import * as React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';
import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import { Application } from 'app';

const Adapter = require('enzyme-adapter-react-16');


configure({ adapter: new Adapter() });

describe('Test', function () {
  beforeEach(() => {
    jasmineEnzyme();
  });
  it('should work', function () {
    mount(<Application/>);
    expect(true).to.eq(true);
  });
});
