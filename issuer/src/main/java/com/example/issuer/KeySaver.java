package com.example.issuer;

public class KeySaver {
    public String id;
    public String pk;

    public KeySaver(String id, String pk) {
        this.id = id;
        this.pk = pk;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPk() {
        return pk;
    }

    public void setPk(String pk) {
        this.pk = pk;
    }
}
