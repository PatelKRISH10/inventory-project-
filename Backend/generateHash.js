const bcrypt = require('bcrypt');

const generateHash = async () => {
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nUpdate database.sql with this hash:');
  console.log(`('Admin', 'admin', '${hash}', 'admin')`);
};

generateHash();
