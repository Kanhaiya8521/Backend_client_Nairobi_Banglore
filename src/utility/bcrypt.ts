import bcrypt from "bcrypt";

export const generateSalt = async():Promise<string> => {
    try {
        return bcrypt.genSalt(10);  
    } catch (error) {
        throw error;
    }
}

export const generateHashPassword = async(plainPassword: string, salt: string): Promise<string> => {
    try {
        return bcrypt.hash(plainPassword, salt);
    } catch (error) {
        throw error;
    }
}

export const verifyPassword = async(plainPassword: string, salt: string): Promise<boolean> => {
    try {
        return bcrypt.compare(plainPassword, salt);
    } catch (error) {
        throw error;
    }
}
