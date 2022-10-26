export class Config {
  static readonly dbPrfx = process.env.DB_PRFX || 'faded';
  static readonly fsdb = process.env.DB_NAME || true;
  static readonly jwt = {
    issuer: process.env.JWT_ISSUER || 'localhost',
    secret: process.env.JWT_SECRET || 'secret',
    expIn: process.env.JWT_EXP_IN
      ? parseInt(process.env.JWT_EXP_IN, 10)
      : 300000,
  };
  static readonly uiOrigin = process.env.UI_ORIGIN || 'http://localhost:5000';
  static readonly mail = {
    host: process.env.EMAIL_HOST || '',
  };
}
