import rxDebounce from '@/utils/rx-debounce'
import rxThrottle from '@/utils/rx-throttle'

import Debounce from '@/utils/debounce'
import Throttle from '@/utils/throttle'

import GenerateUuid from '@/utils/generate-uuid'

export default [
    {
      path: '/rx-debounce',
      name: 'rx-debounce',
      component: rxDebounce
    },
    {
      path: '/rx-throttle',
      name: 'rx-throttle',
      component: rxThrottle
    },
    {
      path: '/debounce',
      name: 'debounce',
      component: Debounce
    },
    {
      path: '/throttle',
      name: 'throttle',
      component: Throttle
    },
    {
      path: '/generate-uuid',
      name: 'generate-uuid',
      component: GenerateUuid
    }
];
