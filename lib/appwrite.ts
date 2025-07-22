import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://appwrite.example.com/v1',
    platform: "com.jsm.satengaapp",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || 'your_project_id',
    databaseId: "687dce9f002373e65a9e",
    bucketId: "687e7b5c0024ed706295",
    userCollectionId: "687dced8001063b95089",
    categoriesCollectionId: "687e76cb0008e59b1c15",
    menuCollectionId: "687e778a002e30f095ff",
    customizationsCollectionId: "687e7945003259f6f78d",
    menuCustomizationCollectionId: "687e7a2f003ddee035ab"
}

export const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const database =new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client)

export const createUser = async({email, password, name}: CreateUserParams) => {

    try {

        const newAccount = await account.create(ID.unique(), email, password, name);

        if (!newAccount) {
            throw new Error('Failed to create user account'); 
        }

        await signIn({email, password});

        console.log('user email: ', email);

        const avatarUrl = await avatars.getInitialsURL(name);
        console.log('avatarUrl: ', avatarUrl);

        return await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                name,
                accountId: newAccount.$id,                
                avatar: avatarUrl
            }
        );
        
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error as string;
    }
}

export const signIn = async({email, password}: SignInParams) => {

    try {
        const session = await account.createEmailPasswordSession(email, password);
    }

    catch (error) {
        console.error('Error signing in:', error);
        throw error as string;
    }

}

export const getCurrentUser = async () => {
    try {

        const currentSession = await account.getSession('current');
        const currentAccount = await account.get();

        if (!currentAccount) {
            throw new Error;
        }   
        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) {
            throw new Error;
        }

        return currentUser.documents[0]; 
        
    } catch (error) {
        console.error(error);
        throw error as string;
    }
}

export const getMenu = async ({ category, query}: GetMenuParams) => {

    try{

        const queries: string[] = [];

        if (category) queries.push(Query.equal('categories', category));
        
        if (query) queries.push(Query.search('name', query));
        

        const menus = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        );

        return menus.documents;

    }

    catch (error) {
        throw new Error(error as string);
    }
}

export const getCategories = async () => {

    try {

        const categories = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId
        );

        return categories.documents;
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        throw error as string;
    }

}