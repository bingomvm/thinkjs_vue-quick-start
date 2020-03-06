const config = require('./config.json'); // fontello 文件
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const opn = require('opn');
const admzip = require('adm-zip');
const FormData = require('form-data');

const csssrc = path.resolve(__dirname, '../../src/assets/iconfonts/css');
const fontsrc = path.resolve(__dirname, '../../src/assets/iconfonts/font');

module.exports.openSession = (open = true) => {
  console.log('创建 session ...');

  const buffer = fs.createReadStream(path.resolve(__dirname, './config.json'));
  const form = new FormData();
  form.append('config', buffer);
  form.submit('http://fontello.com', (err, res) => {
    res.setEncoding('utf8');
    res.on('data', data => {
      if (data.length === 32) {
        console.log('Session:', data);
        open && opn(`http://fontello.com/${data}`, { wait: false });

        fs.writeFileSync(path.resolve(__dirname, './session.txt'), data, {
          encoding: 'utf8',
        });
      }
    });
  });
};

module.exports.updateFile = () => {
  if (!fs.existsSync(path.resolve(__dirname, './session.txt'))) {
    return console.log('No session found, edit first');
  }

  const session = fs.readFileSync(path.resolve(__dirname, './session.txt'), {
    encoding: 'utf8',
  });

  console.log('Downloading...');
  axios({
    method: 'get',
    url: `http://fontello.com/${session}/get`,
    responseType: 'stream',
  })
    .then(response => {
      const stream = response.data.pipe(
        fs.createWriteStream(path.resolve(__dirname, './fontello.zip'))
      );

      stream.on('close', () => {
        console.log('Updating...');

        const zip = new admzip(path.resolve(__dirname, './fontello.zip'));
        const entries = zip.getEntries();

        entries.forEach(file => {
          // console.log(file, fontsrc, csssrc);
          const ext = path.extname(file.entryName);
          switch (ext) {
            case '.eot':
            case '.svg':
            case '.ttf':
            case '.woff':
            case '.woff2':
              fs.writeFileSync(path.join(fontsrc, file.name), file.getData());
              break;
            case '.css':
              fs.writeFileSync(path.join(csssrc, file.name), file.getData());
              break;
            case '.json':
              const json = JSON.parse(file.getData().toString('utf8'));
              delete json.session;

              fs.writeFileSync(
                path.resolve(__dirname, './config.json'),
                JSON.stringify(json),
                {
                  encoding: 'utf8',
                }
              );
              break;
            default:
              console.log('drop', file.name);
          }
        });

        fs.unlinkSync(path.resolve(__dirname, './fontello.zip'));
      });
    })
    .catch(err => {
      console.error('ERROR', err);
    });
};
