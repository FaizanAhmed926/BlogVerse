import conf from "../conf/conf.js";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    tablesDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client); // Fixed: use this.client
        this.bucket = new Storage(this.client); // Fixed: use this.client
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            return await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            });
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            });
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            console.log("Getting posts with queries:", queries);
            const result = await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries: queries
            });

            console.log("Raw posts result:", result);

            // TablesDB returns rows, not documents
            if (result && result.rows) {
                return { documents: result.rows }; // Convert to expected format
            }
            return { documents: [] };

        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);
            return { documents: [] };
        }
    }

    // File upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false;
        }
    }

    // In your config.js file
    async getFilePreview(fileId) {
        try {
            // For Appwrite Storage, getFilePreview returns a URL string directly
            const previewUrl = this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
            return previewUrl;
        } catch (error) {
            console.log("Appwrite Service :: GetFilePreview :: error", error);
            return null;
        }
    }

    getFileView(fileId) {
    try {
        const url = this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        );
        return url;
    } catch (error) {
        console.log("Appwrite Service :: getFileView :: error", error);
        return null;
    }
}

    async getFileDownload(fileId) {
    try {
        return this.bucket.getFileDownload(
            conf.appwriteBucketId,
            fileId
        );
    } catch (error) {
        console.log("Appwrite Service :: getFileDownload :: error", error);
        return null;
    }
}
}

const service = new Service();
export default service;