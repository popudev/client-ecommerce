import { loading } from '~/components/Loading/core';

const { notification } = require('~/components/Notification/core');
const { toast } = require('~/components/Toast/core');

const checkStatusErrorApi = (err, error400 = false) => {
  loading.done();
  switch (err.status) {
    case 400:
      if (error400) toast.error(err?.data?.mess);
      return err?.data;

    case 401:
    case 403:
      toast.error('Please Login :(((');
      break;

    case 429:
      notification.setTitle(
        [
          "Let's Live Slowly :)))",
          `Please try again in ${err.headers['ratelimit-reset']} seconds`,
          'Thank you so much <3',
        ],
        notification.type.liveSlow,
      );
      break;

    default:
      toast.error('Server Error :(((');
  }

  return false;
};

export default checkStatusErrorApi;
