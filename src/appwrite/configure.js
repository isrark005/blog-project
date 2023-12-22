import config from "../config/config";
import { Client, Databases, Storage } from "appwrite";


export class Services {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, author}) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    author,
                });
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId, 
                config.appWriteCollectionId, 
                slug,
                {
                    title,
                    content, 
                    featuredImage, 
                    status,
                });
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId, 
                config.appWriteCollectionId,  
                slug,)
                return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }
    
    async getPost(slug) {
        try {
            await this.databases.getDocument(
                config.appWriteDatabaseId, 
                config.appWriteCollectionId,  
                slug,)
                return true;
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId, 
                config.appWriteCollectionId,  
                queries,)
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }

    // upload file 
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                appWriteBucketId,
                ID.unique(),
                file,
                )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deletePost(fileId) {
        try {
            return await this.storage.deleteFile(
                appWriteBucketId,
                fileId,)

        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            appWriteBucketId,
            fileId,)
    }
}


const services = Services()
export default services;