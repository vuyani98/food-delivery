import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://appwrite.example.com/v1',
    platform: "com.jsm.satengaapp",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || 'your_project_id',
    databaseId: "687dce9f002373e65a9e",
    userCollectionId: "687dced8001063b95089",

}

export const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const database =new Databases(client);
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