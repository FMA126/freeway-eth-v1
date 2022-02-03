import {expect} from './chai-setup';
import {ethers, deployments, getUnnamedAccounts} from 'hardhat';
import {FreeWayDriver} from '../typechain';
import {setupUsers} from './utils';

const setup = deployments.createFixture(async () => {
  await deployments.fixture('FreeWayDriver');
  const contracts = {
    FreeWayDriver: <FreeWayDriver>await ethers.getContract('FreeWayDriver'),
  };
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
  };
});
describe('FreeWayDriver', function () {
  it('setMessage works', async function () {
    const {users, FreeWayDriver} = await setup();
    const testMessage = 'Hello World';
    await expect(users[0].FreeWayDriver.setMessage(testMessage))
      .to.emit(FreeWayDriver, 'MessageChanged')
      .withArgs(users[0].address, testMessage);
  });
});
