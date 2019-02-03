'use strict';

const srv = {};

function checkAccess(roles, isAllow) {
    roles = roles || [];
    roles = typeof 'string' ? [roles] : roles;

    return (req, res, next) => {
        let access = false;

        if (!roles.length) {
            access = true;
        } else {
            let role = 'guest';

            if (req.user) {
                role = req.user.role;
            }

            if (isAllow) {
                access = roles.indexOf(role) !== -1;
            } else {
                access = roles.indexOf(role) === -1;
            }
        }

        if (access) {
            next();
        } else {
            denyAction(req, res);
        }
    };
}

function denyAction(req, res) {
    if (req.user) {
        res.json({
            code: 403,
            error: 'forbidden'
        });
    } else {
        res.json({
            code: 401,
            error: 'login_required'
        });
    }
}


srv.allow = (roles) => {
    return checkAccess(roles, true);
};

srv.deny = (roles) => {
    return checkAccess(roles, false);
};

module.exports = srv;
