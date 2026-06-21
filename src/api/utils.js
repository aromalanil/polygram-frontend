import api from './config';

const linkPreviewCache = new Map();

export const getLinkPreview = (url) => {
  if (linkPreviewCache.has(url)) {
    return linkPreviewCache.get(url);
  }

  const promise = api
    .get('/utils/link-preview', {
      params: { url },
    })
    .then((response) => response?.data?.data);

  linkPreviewCache.set(url, promise);

  return promise;
};
