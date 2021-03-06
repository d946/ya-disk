import { createReadStream } from 'fs';
import { request } from 'https';
import { parse } from 'url';
import upload from '../src/upload';

const API_TOKEN = '';

upload.link(API_TOKEN, 'disk:/Приложения/ya-disk-api/package.json', true, ({href, method}) => {
  const fileStream = createReadStream('./package.json');

  const uploadStream = request(Object.assign(parse(href), { method }));

  fileStream.pipe(uploadStream);

  fileStream.on('end', () => uploadStream.end());
}, console.error);
