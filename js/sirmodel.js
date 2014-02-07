// SIR model simulation

var SIR = function(S0,I0,R0, beta, alpha, n){
    var S = new Array();
    var I = new Array();
    var R = new Array();
    S[0]=S0;
    I[0]=I0;
    R[0]=R0;
    var bis;
    var ai;
    for(var t=1;t<n;t++){
        bis = beta*I[t-1]*S[t-1];
	ai = alpha*I[t-1];
	S[t]=S[t-1]-bis;
	I[t]=I[t-1]+bis-ai;
	R[t]=R[t-1]+ai;
    };
    return {S:S, I:I, R:R, n:n};
};

var SI = function(S0, I0, beta, alpha, n, binom){
    var S = new Array();
    var I = new Array();
    S[0]=S0;
    I[0]=I0;
    var bis;
    var ai;  

    for(var t=1;t<n;t++){
        bis = beta*I[t-1]*S[t-1];
	ai = alpha*I[t-1];
	S[t]=S[t-1]-bis+ai;
	I[t]=I[t-1]+bis-ai;
    };
    return {S:S, I:I, n:n};   

}