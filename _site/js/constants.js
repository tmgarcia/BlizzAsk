'use strict';

angular.module('app.constants',[])
    .value('DataFilters',{
        QuestionPartialFilter:'!17vW03g-E)Q9bnl0q_m22K_XcK3S(3VFqh4f)1lG.F3YV-',
        QuestionFullFilter_Unautharized:'!*i5ncQqRi*6k*wLx46h9_mMlPS8z2Y2Fn(zJMQ55FRgfJlZwDH(fbEN3gns62_pIh_PKw1',
        UserFullFilter:'!9YdnSBVWs',
        TagPartialFilter:'!4-J-dtwSuoFRxMOYG'
    })
    .value('DataSorts',{
        QuestionSearch:{Active:'activity',Newest:'creation',Votes:'votes',Relevance:'relevance'},
        TagSearch:{Popular:'popular',Activity:'activity',Name:'name'}
    })
    .value('AuthenticationValues',{clientId:'5408',key:'9GnBtV76OfT15R9dYjMF*Q((',channelUrl:'tmgarcia.github.io/BlizzAsk/blank'});
//!bNKX0pf0krs*AY
//Active - activity, Newest - creation, Votes - votes, Hot - hot
//Week - week, Month - month