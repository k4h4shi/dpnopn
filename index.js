#!/usr/bin/env node

const DpnOpn = require('./lib/dpnopn');
const dpnOpn = new DpnOpn(process.argv);
dpnOpn.exec();