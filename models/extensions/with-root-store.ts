/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRoot, IStateTreeNode } from 'mobx-state-tree'
import { RootStoreModel } from '../root-store/root-store'

/**
 * Adds a rootStore property to the node for a convenient
 * and strongly typed way for stores to access other stores.
 */
export const withRootStore = (self: IStateTreeNode) => ({
  views: {
    /**
     * The root store.
     */
    get rootStore() {
      // Adding RootStore type here fixes the typing problem witt stores
      return getRoot<typeof RootStoreModel>(self)
    },
  },
})

export const getRootStore = (self: IStateTreeNode) => getRoot<typeof RootStoreModel>(self)
