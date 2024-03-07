const app = express();
app.use(cors());
const port = 3000;

// MongoDB Connection
async function connectToMongoDB() {
  try {
    const propertiesPath = path.resolve(__dirname, 'conf/db.properties');
    const properties = propertiesReader(propertiesPath);

    const dbPrefix = properties.get('db.prefix');
    const dbUser = encodeURIComponent(properties.get('db.user'));
    const dbPwd = properties.get('db.pwd');
    const dbName = properties.get('db.dbName');
    const dbUrl = properties.get('db.dbUrl');
    const dbParams = properties.get('db.params');

    const uri = `${dbPrefix}${dbUser}:${dbPwd}${dbUrl}${dbParams}`;

    const client = new MongoClient(uri);

    await client.connect();
    console.log('Connected to MongoDB');

    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}