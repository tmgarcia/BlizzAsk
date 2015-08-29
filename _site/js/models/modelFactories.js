'use strict';

angular.module('app.modelFactories',[])
    .factory('UserModel',function(){ return User;})
    .factory('QuestionModel',function(){return Question;})
    .factory('AnswerModel',function(){return Answer;})
    .factory('CommentModel',function(){return Comment;})
    .factory('BadgeModel',function(){return Badge;})
    .factory('TagModel',function(){return Tag;});


function User(){
    this.stats = {
        reputation:0,
        acceptRate:0,
        answerCount:0,
        questionCount:0,
        downvoteCount:0,
        upvoteCount:0,
        viewCount:0,
        badgeCount:{
            bronze:0,
            silver:0,
            gold:0
        }
    };
    this.account = {
        id:0,
        creationDate:new Date(0),
        lastLogin:new Date(0),
        lastModified:new Date(0)
    };
    this.id = 0;
    this.name = '';
    this.profileImage = '';
    this.aboutMe = '';
    this.age = 0;
    this.isEmployee = false;
    this.location = '';
    this.websiteUrl = '';
    this.link = '';
}
function Question(){
    this.id=0;
    this.owner = new User();
    this.title='';
    this.body='';
    this.bodyMarkdown='';
    this.comments='';
    this.answers=[];
    this.tags='';
    this.isAnswered=false;
    this.acceptedAnswerId=0;
    
    this.lastEditor='';
    this.bounty={amount:0,closesDate:new Date(0),user:''};
    this.closedDetails='';
    this.closedReason='';
    this.notice='';
    
    this.currentuser={
        canClose:false,
        canFlag:false,
        favorited:false,
        upvoted:false,
        downvoted:false};
    
    this.stats = {
        score:0,
        answerCount:0,
        commentCount:0,
        upvoteCount:0,
        viewCount:0,
        favoriteCount:0,
        closeVoteCount:0,
        reopenVoteCount:0,
        deleteVoteCount:0};
    
    this.dates = {
        creationDate: new Date(0),
        lastEditDate: new Date(0),
        lastActivityDate: new Date(0),
        communityOwnedDate: new Date(0),
        closedDate: new Date(0),
        protectedDate: new Date(0),
        lockedDate: new Date(0)};
    
    this.getBodyPreview = function(numChars){
        return this.body.substr(0,numChars);
    };
    this.getBodyPreviewAtNewline = function(maxChars){
        var firstNl = this.body.indexOf('\n');
        var length = firstNl;
        if(firstNl > maxChars || firstNl === -1) length = maxChars;
        return this.body.substr(0,length);
    };
}
function Answer(){
    this.id=0;
    this.title='';
    this.body='';
    this.bodyMarkdown='';
    this.comments=[];
    this.isAccepted=false;
    this.owner=new User();
    this.questionId=0;
    this.tags=[];
    this.lastEditor=new User();
    this.awardedBounty={amount:0,users:[]};
    
    this.currentUser={
        accepted:false, 
        canFlag:false, 
        downvoted:false, 
        upvoted:false};

    this.stats = {
        score:0, 
        commentCount:0, 
        downvoteCount:0, 
        upvoteCount:0};
    
    this.dates = {
        communityOwnedDate:new Date(0),
        creationDate:new Date(0),
        lastActivityDate:new Date(0),
        lastEditDate:new Date(0),
        lockedDate:new Date(0)};
}
function Comment(){
    this.id=0;
    this.body='';
    this.bodyMarkdown='';
    this.owner=new User();
    this.score=0;
    this.postId=0;
    this.edited=false;
    this.postType='';
    this.replyToUser='';

    this.creationDate=new Date(0);

    this.currentUser={
        canFlag:false,
        upvoted:false};
}
function Badge(){
    this.id=0;
    this.type='named';// named/tag_based
    this.awardCount=0;
    this.name='';
    this.rank='bronze';// gold/bronze/ilver
    this.user='';
}
function Tag(){
    this.count=0;
    this.hasSynonyms=false;
    this.moderatorOnly=false;
    this.required=false;
    this.lastActivityDate=new Date(0);
    this.name='';
    this.synonyms=[];
    this.userId=0;
}