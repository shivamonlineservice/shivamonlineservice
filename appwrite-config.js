const appwriteClient = new Appwrite.Client();

appwriteClient
    .setEndpoint("https://sgp.cloud.appwrite.io/v1")
    .setProject("6aa4bc460035da2e3258");

    const appwriteAccount = new Appwrite.Account(appwriteClient);
const appwriteTablesDB = new Appwrite.TablesDB(appwriteClient);
