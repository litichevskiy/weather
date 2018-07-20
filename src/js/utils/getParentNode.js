function getParentNode( target, tagName ) {
    if( !tagName ) return;

    while( target.tagName  ) {
        if( target.tagName === tagName ) return target;
        else target = target.parentElement;
    }
};

module.exports = getParentNode;