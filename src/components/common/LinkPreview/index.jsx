import { useEffect, useState } from 'react';

import './style.scss';
import { getLinkPreview } from '../../../api/utils';
import { singleUrlRegex } from '../../../utils/regex';

const LinkPreview = ({ content }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const updateData = async () => {
      const url = content.match(singleUrlRegex);
      if (!url || !url[0]) return;

      try {
        const apiData = await getLinkPreview(url[0]);
        setData(apiData);
      } catch {} // eslint-disable-line no-empty
    };

    updateData();
  }, [content]);

  const hasLargeImage = data?.images[0];
  return data ? (
    <a className="link-preview-anchor" href={data?.url} target="_blank" rel="noreferrer">
      <div className={`link-preview ${hasLargeImage && 'with-large-image'}`}>
        <img src={data?.images[0]} alt={data?.title} />
        <div className="content">
          <div className="top">
            <h1 className="title">{data?.title ?? 'Not Found'}</h1>
            <p className="description">{data?.description ?? 'No Description Provided'}</p>
          </div>
          <p className="url">{data?.url}</p>
        </div>
      </div>
    </a>
  ) : null;
};

export default LinkPreview;
