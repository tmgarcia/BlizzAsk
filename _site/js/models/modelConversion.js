'use strict';

angular
    .module('app.modelConversion', ['app.modelFactories'])
    .factory('TagConverter',['TagModel',TagConverter])
    .factory('UserConverter', ['UserModel', UserConverter])
    .factory('CommentConverter', ['CommentModel', 'UserConverter', CommentConverter])
    .factory('AnswerConverter',['AnswerModel', 'UserConverter', 'CommentConverter','TagConverter',AnswerConverter])
    .factory('QuestionConverter', ['QuestionModel', 'UserConverter', 'AnswerConverter', 'CommentConverter','TagConverter', QuestionConverter]);

function UserConverter(UserModel){
    var service = {
        convertUser : convertUser,
        convertUserArray : convertUserArray,
    };
    return service;
    
    function convertUser(userObj){
        
        var user = new UserModel();
        var keys = {
            'user_id':{value:'id'},
            'display_name':{value:'name'},
            'profile_image':{value:'profileImage'},
            'about_me':{value:'aboutMe'},
            'age':{value:'age'},
            'is_employee':{value:'isEmployee'},
            'location':{value:'location'},
            'website_url':{value:'websiteUrl'},
            'link':{value:'link'},
            
            'account_id':{value:['account','id']},
            'creation_date':{value:['account','creationDate'],transformFunc:convertDate},
            'last_access_date':{value:['account','lastLogin'],transformFunc:convertDate},
            'last_modified_date':{value:['account','lastModified'],transformFunc:convertDate},
            
            'badge_counts':{value:['stats','badgeCount']},
            'reputation':{value:['stats','reputation']},
            'accept_rate':{value:['stats','acceptRate']},
            'answer_count':{value:['stats','answerCount']},
            'question_count':{value:['stats','questionCount']},
            'down_vote_count':{value:['stats','downvoteCount']},
            'upvote_count':{value:['stats','upvoteCount']},
            'view_count':{value:['stats','viewCount']}
        };
        return modelFromJSON(UserModel,userObj,keys);
    }
    function convertUserArray(objArray){
        var users = [];
        for(var i = 0; i < objArray.length; i++){
            var user = convertUser(objArray[i]);
            users.push(user);
        }
        return users;
    }
}
function CommentConverter(CommentModel,UserConverter){
    var service = {
        convertComment : convertComment,
        convertCommentArray : convertCommentArray
    };
    return service;
    function convertComment(commentObj){
        var keys = {
            'comment_id':{value:'id'},
            'body':{value:'body'},
            'body_markdown':{value:'bodyMarkdown'},
            'owner':{value:'owner',transformFunc:UserConverter.convertUser},
            'score':{value:'score'},
            'post_id':{value:'postId'},
            'edited':{value:'edited'},
            'post_type':{value:'postType'},
            'reply_to_user':{value:'replyToUser',transformFunc:UserConverter.convertUser},
            'creation_date':{value:'creationDate',transformFunc:convertDate},
            'can_flag':{value:'canFlag'},
            'upvoted':{value:'upvoted'},
        };
        return modelFromJSON(CommentModel,commentObj,keys);
    }
    function convertCommentArray(objArray){
        var comments = [];
        for(var i = 0; i < objArray.length; i++){
            var comment = convertComment(objArray[i]);
            comments.push(comment);
        }
        return comments;
    }
}
function AnswerConverter(AnswerModel,UserConverter, CommentConverter, TagConverter){
    var service = {
        convertAnswer:convertAnswer,
        convertAnswerArray:convertAnswerArray
    };
    return service;
    function convertAnswer(answerObj){
        var keys = {
            'id':{value:'id'},
            'title':{value:'title'},
            'body':{value:'body'},
            'body_markdown':{value:'bodyMarkdown'},
            'comments':{value:'comments', transformFunc:CommentConverter.convertCommentArray},
            'is_accepted':{value:'isAccepted'},
            'owner':{value:'owner',transformFunc: UserConverter.convertUser},
            'question_id':{value:'questionId'},
            'tags':{value:'tags',transformFunc: TagConverter.convertTagArray},
            'last_editor':{value:'lastEditor', transformFunc: UserConverter.convertUserArray},
            'awarded_bounty_amount':{value:['awardedBounty','amount']},
            'awarded_bounty_users':{value:['awardedBounty','users'], transformFunc: UserConverter.convertUser},
            
            'accepted':{value:['currentUser','accepted']},
            'can_flag':{value:['currentUser','canFlag']},
            'downvoted':{value:['currentUser','downvoted']},
            'upvoted':{value:['currentUser','upvoted']},

            'score':{value:['stats','score']},
            'comment_count':{value:['stats','commentCount']},
            'down_vote_count':{value:['stats','downvoteCount']},
            'up_vote_count':{value:['stats','upvoteCount']},

            'community_owned_date':{value:['dates','communityOwnedDate'], transformFunc:convertDate},
            'creation_date':{value:['dates','creationDate'], transformFunc:convertDate},
            'last_activity_date':{value:['dates','lastActivityDate'], transformFunc:convertDate},
            'last_edit_date':{value:['dates','lastEditDate'], transformFunc:convertDate},
            'locked_date':{value:['dates','lockedDate'], transformFunc:convertDate},
        };
        return modelFromJSON(AnswerModel,answerObj,keys);
    }
    function convertAnswerArray(objArray){
        var answers = [];
        for(var i = 0; i < objArray.length; i++){
            var answer = convertAnswer(objArray[i]);
            answers.push(answer);
        }
        return answers;
    }
}
function QuestionConverter(QuestionModel, UserConverter, AnswerConverter, CommentConverter, TagConverter){
    var service = {
        convertQuestion : convertQuestion,
        convertQuestionArray : convertQuestionArray
    };
    return service;
    
    function convertQuestion(questionObj){
        var keys = {
            'question_id':{value:'id'},
            'owner':{value:'owner', transformFunc: UserConverter.convertUser},
//            'body':{value:'body'},
//            'title':{value:'title'},
            'body_markdown':{value:'bodyMarkdown'},
            'comments':{value:'comments', transformFunc:CommentConverter.convertCommentArray},
            'answers':{value:'answers', transformFunc: AnswerConverter.convertAnswerArray},
            'tags':{value:'tags',transformFunc: TagConverter.convertTagArray},
            'is_answered':{value:'isAnswered'},
            'accepted_answer_id':{value:'acceptedAnswerId'},
            'last_editor':{value:'lastEditor'},
            
            'closed_details':{value:'closedDetails'},
            'closed_reason':{value:'closedReason'},
            'notice':{value:'notice'},

            'can_close':{value:['currentUser','canClose']},
            'can_flag':{value:['currentUser','canFlag']},
            'can_favorite':{value:['currentUser','canFavorite']},
            
            'bounty_amount':{value:['bounty','amount']},            
            'bounty_closes_date':{value:['bounty','closesDate']},
            'bounty_user':{value:['bounty','user']},

            'creation_date':{value:['dates','creationDate'],transformFunc:convertDate},
            'last_edit_date':{value:['dates','lastEditDate'],transformFunc:convertDate},
            'last_activity_date':{value:['dates','lastActivityDate'],transformFunc:convertDate},
            'community_owned_date':{value:['dates','communityOwnedDate'],transformFunc:convertDate},
            'closed_date':{value:['dates','closedDate'],transformFunc:convertDate},
            'protected_date':{value:['dates','protectedDate'],transformFunc:convertDate},
            'locked_date':{value:['dates','lockedDate'],transformFunc:convertDate},
            
            'score':{value:['stats','score']},
            'answer_count':{value:['stats','answerCount']},
            'comment_count':{value:['stats','commentCount']},
            'upvote_count':{value:['stats','upvoteCount']},
            'view_count':{value:['stats','viewCount']},
            'favorite_count':{value:['stats','favoriteCount']},
            'close_vote_count':{value:['stats','closeVoteCount']},
            'reopen_vote_count':{value:['stats','reopenVoteCount']},
            'delete_vote_count':{value:['stats','deleteVoteCount']}};
        return modelFromJSON(QuestionModel,questionObj,keys);
    }
    function convertQuestionArray(objArray){
        var questions = [];
        for(var i = 0; i < objArray.length; i++){
            var question = convertQuestion(objArray[i]);
            questions.push(question);
        }
        return questions;
    }
}
function BadgeConverter(BadgeModel,UserConverter){
    var service = {
        convertBadge:convertBadge,
        convertBadgeArray:convertBadgeArray
    };
    return service;
    
    function convertBadge(badgeObj){
        var keys = {
            'badge_id':{value:'id'},
            'badge_type':{value:'type'},
            'award_count':{value:'awardCount'},
            'name':{value:'name'},
            'rank':{value:'rank'},
            'user':{value:'user',transformFunc:UserConverter.convertUser}
        };
        return modelFromJSON(BadgeModel,badgeObj,keys);
    }
    function convertBadgeArray(arrayObj){
        var badges = [];
        for(var i = 0; i < arrayObj.length; i++){
            var badge = convertBadge(arrayObj[i]);
            badges.push(badge);
        }
        return badges;
    }
}
function TagConverter(TagModel){
    var service = {
        convertTag:convertTag,
        convertTagArray:convertTagArray
    };
    return service;
    
    function convertTag(tagObj){
        var keys = {
            count:{value:'count'},
            has_synonyms:{value:'hasSynonyms'},
            is_moderator_only:{value:'moderatorOnly'},
            is_required:{value:'required'},
            last_activity_date:{value:'lastActivityDate'},
            name:{value:'name'},
            synonyms:{value:'synonyms'},
            user_id:{value:'userId'},
        };
        var tag = modelFromJSON(TagModel,tagObj,keys);
        return tag;
    }
    function convertTagArray(arrayObj){
        var tags = [];
        for(var i = 0; i < arrayObj.length; i++){
            var tag = convertTag(arrayObj[i]);
            tags.push(tag);
        }
        return tags;
    }
}

function convertDate(date){
    var d;
    if(!absent(date)){
        d = new Date(date*1000);
    }
    return d;
}
function absent(property){
    return (typeof property === 'undefined');
}
function modelFromJSON(Ctor, data, keys){
    var obj = new Ctor();
    for(var key in data){
        if(!absent(data[key])){
            if(keys.hasOwnProperty(key)){
                var v = (keys[key].hasOwnProperty('value'))? keys[key].value : key;
                var valueData = (keys[key].hasOwnProperty('transformFunc'))? keys[key].transformFunc(data[key]) : data[key];
                if(v instanceof Array){
                    var name = v[v.length-1];
                    var p = getNestedProp(obj,0,v);
                    if(!absent(p)){
                        p[name] = valueData;
                    }
                }
                else{
                    obj[v] = valueData;
                }
            }
            else if(obj.hasOwnProperty(key)){
                    obj[key] = data[key];
            }
        }
    }
    return obj;
}
function getNestedProp(obj, currentIndex, names){
    if(currentIndex==names.length-1){
        return obj;
    }
    return getNestedProp(obj[names[currentIndex]], currentIndex+1, names);
}