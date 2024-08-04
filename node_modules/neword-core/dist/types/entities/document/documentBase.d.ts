import { z } from "zod";
import { DocumentCategory } from "../../types/documentCategory";
export declare const DocumentTypeFactory: {
    INSTAGRAM_CAPTION: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            caption: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            caption: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            caption: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            captionText: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            captionText: string;
        }, {
            captionText: string;
        }>;
        category: DocumentCategory;
    };
    INSTAGRAM_POST_IDEA: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            ideaDescription: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            ideaDescription: string;
        }, {
            ideaDescription: string;
        }>;
        category: DocumentCategory;
    };
    INSTAGRAM_BIO_DESCRIPTION: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            bioDescription: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            bioDescription: string;
        }, {
            bioDescription: string;
        }>;
        category: DocumentCategory;
    };
    INSTAGRAM_STORY_IDEA: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            storyIdea: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            storyIdea: string;
        }, {
            storyIdea: string;
        }>;
        category: DocumentCategory;
    };
    INSTAGRAM_REEL_IDEA: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            reelIdea: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            reelIdea: string;
        }, {
            reelIdea: string;
        }>;
        category: DocumentCategory;
    };
    INSTAGRAM_REEL_SCRIPT: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            script: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            script: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            script: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            reelScript: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            reelScript: string;
        }, {
            reelScript: string;
        }>;
        category: DocumentCategory;
    };
    FACEBOOK_POST_CAPTION: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            caption: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            caption: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            caption: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            postCaption: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            postCaption: string;
        }, {
            postCaption: string;
        }>;
        category: DocumentCategory;
    };
    FACEBOOK_POST_IDEA: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            postIdea: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            postIdea: string;
        }, {
            postIdea: string;
        }>;
        category: DocumentCategory;
    };
    FACEBOOK_PAGE_ABOUT: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            pageAbout: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            pageAbout: string;
        }, {
            pageAbout: string;
        }>;
        category: DocumentCategory;
    };
    LINKEDIN_POST_CAPTION: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            caption: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            caption: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            caption: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            postCaption: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            postCaption: string;
        }, {
            postCaption: string;
        }>;
        category: DocumentCategory;
    };
    LINKEDIN_POST_IDEA: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            postIdea: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            postIdea: string;
        }, {
            postIdea: string;
        }>;
        category: DocumentCategory;
    };
    LINKEDIN_PAGE_ABOUT: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            pageAbout: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            pageAbout: string;
        }, {
            pageAbout: string;
        }>;
        category: DocumentCategory;
    };
    TWITTER_TWIT: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            tweet: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            tweet: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            tweet: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            tweetContent: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            tweetContent: string;
        }, {
            tweetContent: string;
        }>;
        category: DocumentCategory;
    };
    THREADS_TWIT: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            thread: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            thread: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            thread: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            threadContent: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            threadContent: string[];
        }, {
            threadContent: string[];
        }>;
        category: DocumentCategory;
    };
    EMAIL_CONTENT: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            subject: z.ZodString;
            content: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            content: string;
            subject: string;
        }, {
            content: string;
            subject: string;
        }>;
        category: DocumentCategory;
    };
    EMAIL_IDEA: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            emailIdea: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            emailIdea: string;
        }, {
            emailIdea: string;
        }>;
        category: DocumentCategory;
    };
    SMS_CONTENT: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            content: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            content: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            content: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            smsContent: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            smsContent: string;
        }, {
            smsContent: string;
        }>;
        category: DocumentCategory;
    };
    SMS_IDEA: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            smsIdea: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            smsIdea: string;
        }, {
            smsIdea: string;
        }>;
        category: DocumentCategory;
    };
    PHONE_CALL_SCRIPT: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            script: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            script: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            script: string;
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            phoneCallScript: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            phoneCallScript: string;
        }, {
            phoneCallScript: string;
        }>;
        category: DocumentCategory;
    };
    GOOGLE_ADS_KEYWORDS: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            keywords: z.ZodArray<z.ZodString, "many">;
        }>, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            keywords: string[];
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            keywords: string[];
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            adKeywords: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            adKeywords: string[];
        }, {
            adKeywords: string[];
        }>;
        category: DocumentCategory;
    };
    GOOGLE_ADS_IDEA: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            adIdea: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            adIdea: string;
        }, {
            adIdea: string;
        }>;
        category: DocumentCategory;
    };
    WEBSITE_ABOUT: {
        inputParams: z.ZodObject<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            aboutContent: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            aboutContent: string;
        }, {
            aboutContent: string;
        }>;
        category: DocumentCategory;
    };
    WEBSITE_FAQ: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            question: z.ZodString;
            answer: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            answer: string;
            description: string;
            audienceId: string;
            question: string;
            imageUrl?: string | undefined;
        }, {
            answer: string;
            description: string;
            audienceId: string;
            question: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            faqEntries: z.ZodArray<z.ZodObject<{
                question: z.ZodString;
                answer: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                answer: string;
                question: string;
            }, {
                answer: string;
                question: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            faqEntries: {
                answer: string;
                question: string;
            }[];
        }, {
            faqEntries: {
                answer: string;
                question: string;
            }[];
        }>;
        category: DocumentCategory;
    };
    WEBSITE_TESTEMONIAL: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            testimonial: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            testimonial: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            testimonial: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            testimonials: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            testimonials: string[];
        }, {
            testimonials: string[];
        }>;
        category: DocumentCategory;
    };
    WEBSITE_PRODUCT_DESCRIPTION: {
        inputParams: z.ZodObject<z.objectUtil.extendShape<{
            description: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
            audienceId: z.ZodString;
        }, {
            productName: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            description: string;
            audienceId: string;
            productName: string;
            imageUrl?: string | undefined;
        }, {
            description: string;
            audienceId: string;
            productName: string;
            imageUrl?: string | undefined;
        }>;
        output: z.ZodObject<{
            productDescriptions: z.ZodArray<z.ZodObject<{
                productName: z.ZodString;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                description: string;
                productName: string;
            }, {
                description: string;
                productName: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            productDescriptions: {
                description: string;
                productName: string;
            }[];
        }, {
            productDescriptions: {
                description: string;
                productName: string;
            }[];
        }>;
        category: DocumentCategory;
    };
};
//# sourceMappingURL=documentBase.d.ts.map