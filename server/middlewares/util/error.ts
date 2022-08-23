//? 에러핸들링 파일로 따로 분리
const createError = (status: number, message: string) => {
  const err = new Error();
  err['status'] = status;
  err.message = message;
  return err;
};

module.exports = createError;
