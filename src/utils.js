import { message } from 'antd';


//Maps dates to integers
export function mapDate(date) {
  var dateList = date.slice(0,10).split('-');
  return dateList[0] * 365 + dateList[1] * 30 + dateList[2];
}

export const isNumber = (rule, value) => {
  if(isNaN(value)) return Promise.reject();
  else return Promise.resolve();
}

export function beforePictureUpload(info, callback) {
  console.log(info);
  if(validPicture(info)) {
    console.log('success')
    getBase64(info, response => {
      console.log(response);
      callback(response);
    });
  }
  return false;
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function validPicture(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
    console.log('')
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}