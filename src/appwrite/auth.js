import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            
            if (userAccount) {
                console.log("User created successfully:", userAccount);
                
                // After account creation, create a session to automatically log the user in
                try {
                    // Try the most common session creation method
                    const session = await this.account.createEmailPasswordSession(email, password);
                    console.log("Session created:", session);
                    return session;
                } catch (sessionError) {
                    console.log("Session creation failed, but user was created:", sessionError);
                    // Even if session fails, return the user account
                    return userAccount;
                }
            }
            return userAccount;
            
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            // Try different possible session methods
            let session;
            
            // Method 1: Most common in newer versions
            try {
                session = await this.account.createEmailPasswordSession(email, password);
                console.log("Login successful with createEmailPasswordSession");
                return session;
            } catch (e) {
                console.log("Method createEmailPasswordSession failed:", e.message);
            }
            
            // Method 2: Alternative name
            try {
                session = await this.account.createSession(email, password);
                console.log("Login successful with createSession");
                return session;
            } catch (e) {
                console.log("Method createSession failed:", e.message);
            }
            
            // Method 3: With object parameter
            try {
                session = await this.account.createEmailSession({
                    email: email,
                    password: password
                });
                console.log("Login successful with createEmailSession (object)");
                return session;
            } catch (e) {
                console.log("Method createEmailSession (object) failed:", e.message);
            }
            
            throw new Error("All login methods failed");
            
        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current user:", user);
            return user;
        } catch (error) {
            // Don't log 401 errors (user not logged in) as they're expected
            if (error.code !== 401) {
                console.log("Appwrite service :: getCurrentUser :: error", error);
            }
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
        return null;
    }
}

const authService = new AuthService();
export default authService;