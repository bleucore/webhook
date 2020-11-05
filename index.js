import http from 'http';
import crypto from 'crypto'; 
import { exec } from 'child_process';
     
const SECRET = '123456';
 
const GITHUB_REPOSITORIES_TO_DIR = { '/home/bitnami/webhook': 
  '/home/bitnami/webhook2'
};
 
http .createServer((req, res) => { req.on('data', chunk => { const signature = 
      `sha1=${crypto
        .createHmac('sha1', SECRET) .update(chunk) .digest('hex')}`;
 
      const isAllowed = req.headers['x-hub-signature'] === signature;
 
      const decoded = urlencode.decode(chunk); 
      const body = JSON.parse(decoded);
 
      const isMaster = body?.ref === 'refs/heads/master'; const directory = 
      GITHUB_REPOSITORIES_TO_DIR[body?.repository?.full_name];
 
      if (isAllowed && isMaster && directory) { try { exec(`cd ${directory} && bash 
          deploy.sh`);
        } catch (error) {
          console.log(error);
        }
      }
    });
 
    res.end();
  })
  .listen(8080);
