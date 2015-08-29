'use strict';

angular.module('app.constants',[])
    .value('DataFilters',{
        QuestionPartialFilter:'!17vW03g-E)Q9bnl0q_m22K_XcK3S(3VFqh4f)1lG.F3YV-',
        QuestionFullFilter_Unauthenticated:'!*i5ncQqRi*6k*wLx46h9_mMlPS8z2Y2Fn(zJMQ55FRgfJlZwDH(fbEN3gns62_pIh_PKw1',
        QuestionFullFilter_Authenticated:'!.PJ0-lVtKP(F_GBHx8ZfP5GJ_(RDGc_obBzRyg7N_AsTY(JpcReyfl8x7O5pA5',
        QuestionFavoriteFilter:'!OfYUOymw_UaCHpPgE3rQHa4DHzctwYulBhCypQ0hdcx',
        UserFullFilter:'!9YdnSBVWs',
        UserDisplayFilter:'!)scTwHvyLl80PneHWE2b',
        TagPartialFilter:'!4-J-dtwSuoFRxMOYG',
        AnswerPartialFilter:'!)Q29lpdRHRpm6XQzql3TL3-s',
        BadgeFullFilter:'!SWJ_XdK1(MmuoqeC0O',
        UserActionFilter:'!39rw95Tgtrxlq-Bj2PNgDdZ4cBKYf'
    })
    .value('DataSorts',{
        QuestionSearch:{Active:'activity',Newest:'creation',Votes:'votes',Relevance:'relevance'},
        QuestionList:{Active:'activity',Newest:'creation',Votes:'votes',Hot:'hot',Week:'week',Month:'month'},
        TagSearch:{Popular:'popular',Activity:'activity',Name:'name'}
    })
    .value('AuthenticationValues',{clientId:'5408',key:'9GnBtV76OfT15R9dYjMF*Q((',channelUrl:'http://blizzask.gametaylor.com/blank'});
//Active - activity, Newest - creation, Votes - votes, Hot - hot
//Week - week, Month - month